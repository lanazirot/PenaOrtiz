const { PrismaClient } = require('@prisma/client')

const prismaInstance = new PrismaClient()

// Export the prisma instance

module.exports = prismaInstance