const Category = require('../models/Category')
const Research = require('../models/Research')
const { logActivity } = require('./activityLogControllers')

const getPublicCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).select('name -_id').sort({ name: 1 })
        const categoryNames = categories.map(cat => cat.name)
        res.status(200).json(categoryNames)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            data: categories
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message })
    }
}

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        if (!name) {
            return res.status(400).json({ success: false, message: 'Category name is required' })
        }

        const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } })
        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'Category with this name already exists' })
        }

        const category = await Category.create({
            name,
            description: description || ''
        })

        if (req.user) {
            await logActivity({
                action: 'create',
                targetType: 'category',
                targetId: category._id,
                targetTitle: category.name,
                userId: req.user._id,
                userName: req.user.name || 'Admin',
                details: { description: category.description },
                ipAddress: req.ip
            })
        }

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create category', error: error.message })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' })
        }

        // Check if new name already exists (excluding current category)
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({
                name: { $regex: new RegExp(`^${name}$`, 'i') },
                _id: { $ne: id }
            })
            if (existingCategory) {
                return res.status(400).json({ success: false, message: 'Category with this name already exists' })
            }
        }

        const oldName = category.name
        if (name) category.name = name
        if (description !== undefined) category.description = description

        await category.save()

        // Log activity
        if (req.user) {
            await logActivity({
                action: 'update',
                targetType: 'category',
                targetId: category._id,
                targetTitle: category.name,
                userId: req.user._id,
                userName: req.user.name || 'Admin',
                details: { oldName, newName: category.name },
                ipAddress: req.ip
            })
        }

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: category
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update category', error: error.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' })
        }

        const researchCount = await Research.countDocuments({ category: category.name })
        if (researchCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete category. ${researchCount} research paper${researchCount > 1 ? 's are' : ' is'} using this category.`
            })
        }

        const categoryName = category.name
        await category.deleteOne()

        if (req.user) {
            await logActivity({
                action: 'delete',
                targetType: 'category',
                targetId: id,
                targetTitle: categoryName,
                userId: req.user._id,
                userName: req.user.name || 'Admin',
                details: {},
                ipAddress: req.ip
            })
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete category', error: error.message })
    }
}

const incrementResearchCount = async (categoryName) => {
    try {
        await Category.findOneAndUpdate(
            { name: categoryName },
            { $inc: { researchCount: 1 } }
        )
    } catch (error) {
        console.error('Failed to increment research count:', error.message)
    }
}

const decrementResearchCount = async (categoryName) => {
    try {
        await Category.findOneAndUpdate(
            { name: categoryName, researchCount: { $gt: 0 } },
            { $inc: { researchCount: -1 } }
        )
    } catch (error) {
        console.error('Failed to decrement research count:', error.message)
    }
}

module.exports = {
    getPublicCategories,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    incrementResearchCount,
    decrementResearchCount
}
