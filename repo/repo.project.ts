import { PrismaClient, Project } from '@prisma/client';
import {GetServerSideProps} from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const prisma = new PrismaClient();
    const projects = await prisma.project.findMany({ take: 30 });
    return {
        props: {projects: projects}
    }
}
