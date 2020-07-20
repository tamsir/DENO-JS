import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import {v4} from 'https://deno.land/std/uuid/mod.ts';

const app = new Application();
const port = 8000;

const router = new Router();

let activities = [
    {
      activity: "Learn how to write in shorthand",
      accessibility: 0.1,
      type: "education",
      participants: 1,
      price: "",
      link: "",
      id: "6778219",
    },
    {
      activity: "Learn how to french braid hair",
      accessibility: 0.1,
      type: "education",
      participants: 1,
      price: "",
      link: "",
      id: "8926492",
    },
    {
      activity: "Compliment someone",
      accessibility: 0.0,
      type: "social",
      participants: 2,
      price: "",
      link: "",
      id: "9149470",
    },
  ];


// GET: récuperer toutes les activités 
router.get('/api/v1/activities', ({response}: {response: any;}) => {
  response.body = {
    success: true,
    data: activities
  }
})

// GET: Récuperer une activité en fonction de l'ID
router.get('/api/v1/activities/:id', (
  {
    params, 
    response
  }: 
  { 
    params: {id: string}; 
    response: any; 
  }
  ) => {
  
      const activity = activities.find((a) => a.id === params.id);
      console.log(activity);
      if(activity){
          response.status = 200;
          response.body = {
            success: true,
            data: activity
          }
      }else{
          response.status = 404;
          response.body = {
            success: false,
            data: "Activity not found !"
          }
      }

})

// POST: Ajouter une activité
router.post('/api/v1/activities', async (
  {
    request, 
    response
  }: 
  {
    request: any; 
    response: any;
  }
  ) => {

    const body = await request.body();
    console.log(body);
    if(!request.hasBody){
          response.status = 400;
          response.body = {
            success: false,
            data: 'No Data found !'
          }
    }else{
          const activity = body.value;
          activity.id = v4.generate(); // id Autogenerate
          response.status = 201;
          response.body = {
            success: true,
            data: activity
          }
    }
})

// PUT: Modifier une activité
router.put('/api/v1/activities/:id', async ({
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
    const activity = activities.find(
      (p) => p.id === params.id
    );
  
    if (activity) {
      const body = await request.body();
  
      const updateData = body.value;
  
      activities = activities.map((p) =>
        p.id === params.id ? { ...p, ...updateData } : p
      );
  
      response.status = 200;
      response.body = {
        success: true,
        data: activities,
      };
    } else {
      response.status = 404;
      response.body = {
        success: false,
        msg: "No Activity found",
      };
    }
  })
// DELETE: Supprimer une activités
 router.delete('/api/v1/activities/:id', (
   { 
     params, 
     response 
   }:
   { 
     params: { id: string }; 
     response: any; 
   }
   ) => {
      activities = activities.filter(a => {
          a.id === params.id;
      });

      response.body={
          success: true,
          msg: "activity deleted!"
      }
  })
app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server is running at http://localhost:8000');
await app.listen({port});
