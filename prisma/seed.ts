import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany({}); // use with caution.

    const amountOfUsers = 50;

    const contacts: User[] = [];

    for (let i = 0; i < amountOfUsers; i++) {
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()

        const userC: User = {
            email: faker.internet.email(firstName, lastName),
            firstName,
            lastName,
            emailVerified: faker.date.past(),
            password: faker.internet.password(),
            image: faker.image.avatar(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            id: i,
        };
        const addUsers = async () => await prisma.user.create( { data: userC } )
        addUsers()
    }

    const addAdmin = async () => await prisma.user.create( { data: {
        email: "admin@localhost",
        firstName: "Admin",
        lastName: "Admin",
        emailVerified: faker.date.past(),
        password: "admin",
        image: faker.image.avatar(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        id: 100,
    } });

    addAdmin()
    // @ts-ignore

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });