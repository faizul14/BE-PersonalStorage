const Research = require('../models/Research')
const cloudinary = require('../../cloudinary/cloudinary')
const slugify = require('slugify')
const { logActivity } = require('./activityLogControllers')
const { incrementResearchCount, decrementResearchCount } = require('./categoryControllers')

const getAllResearch = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query
        const query = { status: 'published' }

        if (category) {
            query.category = category
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }

        const research = await Research.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))

        const totalDocuments = await Research.countDocuments(query)

        res.status(200).json({
            data: research,
            pagination: {
                totalDocuments,
                totalPages: Math.ceil(totalDocuments / limit),
                currentPage: parseInt(page),
                limit: parseInt(limit)
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch research', error: error.message })
    }
}

const getResearchBySlug = async (req, res) => {
    try {
        const { slug } = req.params
        const research = await Research.findOne({ slug, status: 'published' })

        if (!research) {
            return res.status(404).json({ message: 'Research not found' })
        }

        res.status(200).json(research)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch research detail', error: error.message })
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Research.distinct('category', { status: 'published' })
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message })
    }
}

const getAdminResearch = async (req, res) => {
    try {
        const research = await Research.find().sort({ createdAt: -1 })
        res.status(200).json(research)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch admin research list', error: error.message })
    }
}

const createResearch = async (req, res) => {
    try {
        const { title, description, category, status } = req.body
        const file = req.file

        if (!title || !description || !category) {
            return res.status(400).json({ message: 'Title, description, and category are required' })
        }

        const slug = slugify(title, { lower: true, strict: true })

        let pdf_url = ''
        let cloudinary_public_id = ''

        if (file) {
            pdf_url = file.path
            cloudinary_public_id = file.filename
        }

        const newResearch = await Research.create({
            title,
            slug,
            description,
            category,
            pdf_url,
            cloudinary_public_id,
            status: status || 'draft'
        })

        await incrementResearchCount(category)

        if (req.user) {
            await logActivity({
                action: 'create',
                targetType: 'research',
                targetId: newResearch._id,
                targetTitle: newResearch.title,
                userId: req.user._id,
                userName: req.user.name || 'Admin',
                details: { category: newResearch.category, status: newResearch.status },
                ipAddress: req.ip
            })
        }

        res.status(201).json({ message: 'Research created successfully', data: newResearch })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to create research', error: error.message })
    }
}

const updateResearch = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, category, status } = req.body
        const file = req.file

        const research = await Research.findById(id)
        if (!research) {
            return res.status(404).json({ message: 'Research not found' })
        }

        const oldCategory = research.category

        if (title) {
            research.title = title
            research.slug = slugify(title, { lower: true, strict: true })
        }
        if (description) research.description = description
        if (category) research.category = category
        if (status) research.status = status

        if (file) {
            if (research.cloudinary_public_id) {
                await cloudinary.uploader.destroy(research.cloudinary_public_id)
            }
            research.pdf_url = file.path
            research.cloudinary_public_id = file.filename
        }

        await research.save()

        if (category && category !== oldCategory) {
            await decrementResearchCount(oldCategory)
            await incrementResearchCount(category)
        }

        if (req.user) {
            await logActivity({
                action: 'update',
                targetType: 'research',
                targetId: research._id,
                targetTitle: research.title,
                userId: req.user._id,
                userName: req.user.name || 'Admin',
                details: { category: research.category, status: research.status },
                ipAddress: req.ip
            })
        }

        res.status(200).json({ message: 'Research updated successfully', data: research })
    } catch (error) {
        res.status(500).json({ message: 'Failed to update research', error: error.message })
    }
}

const deleteResearch = async (req, res) => {
    try {
        const { id } = req.params
        const research = await Research.findById(id)

        if (!research) {
            return res.status(404).json({ message: 'Research not found' })
        }

        if (research.cloudinary_public_id) {
            await cloudinary.uploader.destroy(research.cloudinary_public_id)
        }

        const researchTitle = research.title
        const researchId = research._id
        const researchCategory = research.category
        await research.deleteOne()

        await decrementResearchCount(researchCategory)

        if (req.user) {
            await logActivity({
                action: 'delete',
                targetType: 'research',
                targetId: researchId,
                targetTitle: researchTitle,
                userId: req.user._id,
                userName: req.user.name || 'Admin',
                details: {},
                ipAddress: req.ip
            })
        }

        res.status(200).json({ message: 'Research and associated file deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete research', error: error.message })
    }
}

module.exports = {
    getAllResearch,
    getResearchBySlug,
    getCategories,
    getAdminResearch,
    createResearch,
    updateResearch,
    deleteResearch
}
