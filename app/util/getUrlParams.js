export default (url) => {
   let [search] = url.match(/(?=\?).+/) || [''];
   let searchParams = new URLSearchParams(search);

   let urlParams = {};
   for (let [key, value] of searchParams.entries()) {
      urlParams[key] = value;
   }
   return urlParams;
};
