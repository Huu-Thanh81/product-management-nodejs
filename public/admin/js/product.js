// change-staus
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const form = document.querySelector("#form-change-status");
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      let statusChange = status === "active" ? "inactive" : "active";
      const action =
        form.getAttribute("data-path") +
        `/${statusChange}/${id}` +
        "/resource?_method=PATCH";
      form.action = action;
      form.submit();
    });
  });
}
// end change-status
//delete Product
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete-item");
  const path = formDelete.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isComfirm = confirm("bạn chắc chắn xóa không ?");
      const id = button.getAttribute("data-id");
      if (isComfirm) {
        const action = path + `${id}` + "/resource?_method=DELETE";
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}
//end delete Product
