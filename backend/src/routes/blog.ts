import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@ashishdtu007/common';


export const blogRouter = new Hono<{ Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
}, 
Variables : {
    userId : string
}}>()
  

blogRouter.use('*', async (c, next) => {
    const header = c.req.header('authorization') || "";
    const token = header.split(" ")[1];
    const response = await verify(token, c.env.JWT_SECRET);
    if(response.id){
        c.set("userId", response.id);
        await next()
    } else{
        c.status(403);
        return c.json({
            msg : "user is unauthorized"
        })
    }
})
  
blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);

    if(!success){
        c.status(403);
        return c.json({msg : "incorrect inputs"});
    }

    try{
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        return c.json({
            id: post.id
        });
    } catch(err){
        c.status(511);
        c.json({
            msg : "error creating the post"
        })
    }
})


blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);

    if(!success){
        c.status(403);
        return c.json({msg : "incorrect inputs"});
    }

    try{
        const updated = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({
            msg : `updated the post with id ${body.id}`
        });
    } catch(err){
        c.status(511);
        return c.json({
            msg : "error updating the blog"
        });
    }
	
});

blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        
        const posts = await prisma.post.findMany({
            select : {
                content : true,
                title : true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
        return c.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return c.json({ error: "Internal Server Error" });
    }
});

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
    try{
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            select : {
                content : true,
                title : true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
        return c.json(post);
    } catch(err){
        c.status(511);
        return c.json({
            msg : "error fetching the blog"
        })
    }
})


