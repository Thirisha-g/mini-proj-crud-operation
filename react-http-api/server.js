// E:\react project\crud\react-http-api>npx json-server --watch db.json --port 4000
// E:\react project\crud\react-http-api>node server.js


const jsonServer=require('json-server')
const multer=require('multer')
const server=jsonServer.create()
const router=jsonServer.router('db.json')
const middlewares=jsonServer.defaults()

server.use(middlewares)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
        let date=new Date()
        let imageFilename=date.getTime()+"_"+file.originalname
        req.body.imageFilename = imageFilename
      cb(null, file.fieldname + imageFilename)
    }
  })
  
  const bodyParser = multer({ storage: storage }).any()


server.use(bodyParser)
server.post("/products",(req, res,next)=>{
    let date=new Date()
    req.body.create=date.toISOString()

    if(req.body.price){
        req.body.price=Number(req.body.price)
    }
    let hasError=false
    let error={}
    if(!req.body.name || req.body.name.trim()===""){
        error.name="Name is required"
        hasError=true
    }
    if(!req.body.description || req.body.description.trim()===""){
        error.description="Description is required"
        hasError=true
    }
    if(!req.body.price || isNaN(req.body.price)){
        error.price="Price should be a number"
        hasError=true
    }
    if(hasError){
        res.status(400).json({errors:error})
        return
    }



    next()
})

server.use(router)
server.listen(4000,()=>{
    console.log('JSON Server is running on port 3000')
})