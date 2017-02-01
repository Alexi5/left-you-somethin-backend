// const axios =require('axios');
// const tunnelIP = "https://fdtrnrqkni.localtunnel.me"
//
//
// module.exports.testAxios = function () {
//     const egg = {
//         goHereImage: 'go here image placeholder',
//         goHereText: 'go here text placeholder',
//         latitude: 41.88914108936634,
//         longitude: -87.63570812550387,
//         payloadType: 'Text',
//         goHereImageBuffer: 'go here image buffer placeholder'
//     }
//
//     axios.post(`${tunnelIP}/api/egg`, egg)
//         .then((returnedEgg)=>{
//             console.log('returnedEgg', returnedEgg.data);
//             console.log('goHereImage', returnedEgg.data.goHereImage);
//         })
//         .catch(err => console.log('addEggTests error', err))
//
// };