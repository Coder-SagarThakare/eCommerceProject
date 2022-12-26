import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import getToken from "../HttpService/LocalStorageService";
import securePost from "../HttpService/APIService";

export default function AddProductModal(props) {
  const { register,handleSubmit,reset } = useForm();
  const formData = new FormData();
  var images = [] ;

  const onSubmit = (data)=>{

    console.log(data);
    console.log(images);

    for(let i=0; i<images.length; i++){
        formData.append('images',images[i])
        console.log(images[i])
    } 

    console.log(formData.values)
    formData.append('name',data.name)
    formData.append('description',data.description)
    formData.append('price',data.price)

    console.log(getToken("activeToken"));
 
    securePost('/products',formData)
    .then((response)=> {
      console.log(response);
      toast.success('product upload successfully')
      props.setAddProduct(false);
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }

  return (
    <div>

    
      <Modal show={props.addProduct} onExit={()=>reset()}>
        <Modal.Header >

          <Modal.Title >+Add new Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Modal.Body style={{boxShadow:'5px 5px 10px black', borderRadius:'20px'}}>
            <div className="d-flex flex-column ">

                <label htmlFor='name'>Enter Name</label>
                <input id='name' placeholder="Enter Product name"  style={{width:'50%'}} type='text' {...register('name')}/>
                <label >Enter Desription</label>

                <textarea placeholder="Enter Product Desription" type='text' {...register('description')}>
                </textarea>

                <label>Price</label>
                <input placeholder="product price" type='number' {...register('price')}/>

                <label>Select photos</label>
                <input type='file'   multiple  required 
                    onChange={(event)=>{
                        images = event.target.files;
                    }}
                />
            </div>
            

          </Modal.Body>

          <Modal.Footer style={{boxShadow:'5px 5px 10px black', borderRadius:'50px'}}>
            <Button
              variant="secondary"
              onClick={() => {
                props.setAddProduct(false);
              }}
            >
              Close
            </Button>

            <Button
              variant="primary"
              type='submit'
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
