interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    { name: 'googleAjax', src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'},
    { name: 'jsClient', src: 'https://apis.google.com/js/client:plusone.js' }
];