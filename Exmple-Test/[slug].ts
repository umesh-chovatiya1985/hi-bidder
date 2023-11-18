import { GetServerSideProps, NextPage } from 'next';
import { getAPIUrl } from '../lib/useLocalStorage';
const ContentPage = ({data}: any) => {
    console.log(data);
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps<any> = async (context) => {
    const { slug } = context.query;
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const res = await fetch(mainApiUrl+'content-page/content-slug/'+slug);
    try {
        const data = await res.json();
        return { props: { data } }
    }
    catch(error: any){
        const data = {status: 0, content: "Opps! Server side error found. Please, try again letter."};
        return { props: { data } }
    }
}

export default ContentPage;
