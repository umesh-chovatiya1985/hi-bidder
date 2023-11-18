import React, { useEffect, useState } from 'react'

export default function HelpIndex() {

    const [categories, setCategories] = useState([]);

    const getAllCategories = async () => {

        const graphqlQuery = {
            query: `query Query($page: Int!, $limit: Int!) {
                        categories(page: $page, limit: $limit) {
                            title
                            slug
                            color
                            level
                        }
                    }`,
            variables: {
                "limit": 200,
                "page": 0
            }
        }

        const categoryReq = await fetch(process.env.GRL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(graphqlQuery)
        });

        if(categoryReq.ok){
            const categoryRespo = await categoryReq.json();
            console.log(categoryRespo);
        }
    };

   useEffect(() => {
        getAllCategories();
   },[]);

  return (
    <div>HelpIndex</div>
  )
}
