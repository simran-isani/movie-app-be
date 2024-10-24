export const EnvConfig = () => {
   return  {
      PORT: process.env.PORT,
      BACKEND_URL: process.env.BACKEND_URL,
   
      DATABASE: {
         MONGODB_URI: process.env.MONGODB_URI,
   
      },
   
      JWT: {
         JWT_SECRET: process.env.JWT_SECRET,
         JWT_EXPIRES : process.env.JWT_EXPIRES
      }
   }
};
