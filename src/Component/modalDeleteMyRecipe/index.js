import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, loadingSelector } from "../../redux/reducer/RecipeSlice";
import { ToastContainer, toast } from "react-toastify";

function ModalDelete(item) {
  console.log(item, "ini modal delete");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      dispatch(deleteRecipe({ recipes_id: item.item.recipes_id }));
      handleClose();
    } catch (err) {
      toast.error("Error updating recipe:", err);
    }
  };

  return (
    <>
      <ToastContainer />
      <button className="btn btn-danger" type="button" onClick={handleShow}>
        <i className="bi bi-trash" style={{ color: "white" }}></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleted My Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ fontFamily: "optima" }}> yakin mau delete?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            {/* {loading ? "loading..." : "save changes"} */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
