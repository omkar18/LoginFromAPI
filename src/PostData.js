
export function PostData(type, userData){
  let BaseURL = 'https://testapi.extraaedge.com/token';
  
  return new Promise((resolve, reject) =>{        
    fetch(BaseURL+type, {
        method: 'POST',
        body: JSON.stringify(userData)
      })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((error) => {
        reject(error);
      });
});
}