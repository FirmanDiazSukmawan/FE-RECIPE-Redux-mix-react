import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingSelector,
  recipeSelector,
  updateRecipe,
} from "../../redux/reducer/RecipeSlice";

function ModalUpdate(item) {
  // console.log(item, "ini data modal");
  const [show, setShow] = useState(false);
  //   console.log(item.item.recipes_id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(recipes_id);
  const [saveImage, setSaveImage] = useState("");
  const dispatch = useDispatch();
  const recipe = useSelector(recipeSelector);
  const recipes = recipe?.[0];
  const loading = useSelector(loadingSelector);
  const [data, setData] = useState({
    name_recipes: "",
    image: saveImage,
    video: "",
    ingredients: "",
  });
  console.log(recipe);

  useEffect(() => {
    setData({
      name_recipes: recipes?.name_recipes,
      image: saveImage,
      video: recipes?.video,
      ingredients: recipes?.ingredients,
    });
  }, [recipes, saveImage]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    // console.log(data);
  };

  const handleUpload = (e) => {
    const uploader = e.target.files[0];
    setSaveImage(uploader);
    console.log(uploader);
  };

  // console.log(data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        updateRecipe({ recipes_id: item.item.recipes_id, data, saveImage })
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(handleSubmit)
  return (
    <>
      <ToastContainer />
      <button
        className="btn btn-warning"
        type="button"
        style={{ marginRight: 8 }}
        onClick={handleShow}
      >
        <i className="bi bi-pen" style={{ color: "white" }}></i>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe yakin?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="file" onChange={handleUpload} name="image" />
          <Form.Control
            type="text"
            placeholder="name recipes"
            className="my-3"
            name="name_recipes"
            value={data?.name_recipes}
            onChange={handleChange}
          />
          <Form.Control
            as="textarea"
            placeholder="ingredients"
            style={{ height: "100px" }}
            name="ingredients"
            value={data?.ingredients}
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="video"
            className="my-3"
            name="video"
            value={data?.video}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            size="sm"
            variant="warning"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "loading..." : "save changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdate;
