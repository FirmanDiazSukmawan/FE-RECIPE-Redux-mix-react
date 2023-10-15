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
import { Spinner } from "react-bootstrap";

function ModalUpdate(item) {
  // console.log(item, "ini data modal");
  const [show, setShow] = useState(false);
  //   console.log(item.item.recipes_id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(recipes_id);
  const [saveImage, setSaveImage] = useState("");
  const [saveVideo, setSaveVideo] = useState("");
  const dispatch = useDispatch();
  const recipe = useSelector(recipeSelector);
  const recipes = recipe?.[0];
  const loading = useSelector(loadingSelector);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [data, setData] = useState({
    name_recipes: "",
    image: saveImage,
    video: saveVideo,
    name_video: "",
    ingredients: "",
  });
  console.log(recipe);

  useEffect(() => {
    setData({
      name_recipes: recipes?.name_recipes,
      image: saveImage,
      video: saveVideo,
      ingredients: recipes?.ingredients,
    });
  }, [recipes, saveImage, saveVideo]);

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

  const handleUploadVideo = (e) => {
    const uploader = e.target.files[0];
    setSaveVideo(uploader);
    console.log(uploader);
  };

  // console.log(data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingUpload(true);
    try {
      await dispatch(
        updateRecipe({
          recipes_id: item.item.recipes_id,
          data,
          saveImage,
          saveVideo,
        })
      );
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpload(false);
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
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="mb-3">Upload Image : </Form.Label>
            <Form.Control type="file" onChange={handleUpload} name="image" />

            <Form.Label className="mt-3">Upload Video : </Form.Label>
            <Form.Control
              type="file"
              onChange={handleUploadVideo}
              name="video"
              className="custom-file-input mb-3"
            />
          </Form.Group>

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
            placeholder="name video"
            className="my-3"
            name="name_video"
            value={data?.name_video}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {loadingUpload ? (
            <Button size="sm" variant="warning" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Uploading...
            </Button>
          ) : (
            <Button
              size="sm"
              variant="warning"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "loading..." : "Save Changes"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdate;
