
export default function HtmlParser(html: any, data: any) {
    const parsedHtml = html.replace(/\{\{(.+?)\}\}/g, (_: any, g: any) => {
        // If there is a wrong data index, returns error
        if (!data[g.trim()]) {
          return "!!Error-"+g.trim()+"!!";
        }  
        return data[g.trim()];
    });
    return parsedHtml;
}
