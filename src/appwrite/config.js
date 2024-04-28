import conf from "../conf/conf";
import { Client, ID , Databases , Storage, Query } from "appwrite";


export class Service{

    client = new Client();
    database;
    bucket;

    constructor () {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title , slug , content , featuredImage , status , userId}) {
        try {
            const post = await this.database.createDocument(
                
              
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                title,
                content,
                featuredImage,
                status,
                userId
                

            });

            return post;
        } catch (error) {
            console.log("appwrite service :: createPost :: error", error);

        }
    }

    async updatePost(slug ,{title , content , featuredImage , status }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.log("appwrite service :: updatePost :: error", error);

        }
    }

    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("appwrite service :: deletePost :: error", error);
            return false;

        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equals("status", "active")]) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

    

}


const service = new Service();
export default service;