//button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  buttonStatus.forEach((button) => {
    // Lấy các tham số phía sau dấu ? trên URL hiện tại và tạo một đối tượng để mình dễ dàng đọc chúng
    const urlParams = new URLSearchParams(window.location.search); //thành một đối tượng giúp bạn dễ dàng lấy từng parameter.
    button.addEventListener("click", (e) => {
      // console.log(window.location.search);//lấy phần query string của URL hiện tại.
      const status = button.getAttribute("button-status");
      if (status) {
        urlParams.set("status", status);
      } else {
        urlParams.delete("status");
      }
      window.location.search = urlParams.toString();
    });
  });
}
// end button status

//form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URLSearchParams(window.location.search);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target[0].name;
    const keyword = e.target[0].value;
    if (keyword === "") return;
    if (keyword) {
      url.set(name, keyword);
    } else {
      url.delete(name);
    }
    window.location.search = url.toString();
  });
}
//end form search
// pagination
const buttonPagination = document.querySelectorAll("[aria-current]");
if (buttonPagination.length > 0) {
  const urlParams = new URLSearchParams(window.location.search); //thành một đối tượng giúp bạn dễ dàng lấy từng parameter.
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const currentPage = button.getAttribute("aria-current");
      urlParams.set("page", currentPage);
      window.location.search = urlParams.toString();
    });
  });
}
// end pagination
//change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    const checkAll = document.querySelector("[checkbox-multi]");
    const inputCheck = document.querySelectorAll("input[name='id']:checked");
    const typeChange = e.target.elements.type.value;
    if (typeChange === "deleted-all") {
      const isComfirm = confirm(
        "Bạn có chắc chắn xóa những sản phầm này không",
      );
      if (!isComfirm) {
        e.preventDefault(); //Ngăn form gửi đi nhưng JS vẫn chạy tiếp.
        return; //Dừng hàm nhưng không tự động ngăn form submit.
      }
    }
    if (inputCheck.length > 0) {
      let ids = [];
      const inputids = formChangeMulti.querySelector("input[name='ids']");
      inputCheck.forEach((input) => {
        const id = input.value;
        if (typeChange === "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      inputids.value = ids.join(", ");
    } else {
      e.preventDefault();
      alert("vui lòng chọn ít nhất một bản ghi");
    }
  });
}
//end change-multi
//check
const checBoxMulti = document.querySelector("[checkBox-multi]");
if (checBoxMulti) {
  const inputCheckAll = checBoxMulti.querySelector("input[name='checkAll']");
  const inputIds = checBoxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputIds.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputIds.forEach((input) => {
        input.checked = false;
      });
    }
  });
  inputIds.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checBoxMulti.querySelectorAll(
        "input[name='id']:checked",
      ).length;
      if (countChecked == inputIds.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
//end check
//Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");
  console.log(closeAlert);
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
//End show Alert
//Review
const inputImage = document.querySelector("#image");
if (inputImage) {
  inputImage.addEventListener("change", (e) => {
    const imagePreviewContainer = document.querySelector(
      "#imagePreviewContainer",
    );
    imagePreviewContainer.classList.remove("d-none");
    const [file] = e.target.files;
    const imgPriview = document.querySelector("#imagePreview");
    imgPriview.src = URL.createObjectURL(file);
  });
}
const btnRemoveImage = document.querySelector("#btnRemoveImage");
if (btnRemoveImage) {
  btnRemoveImage.addEventListener("click", () => {
    const imagePreviewContainer = document.querySelector(
      "#imagePreviewContainer",
    );
    imagePreviewContainer.classList.add("d-none");
    const imgPriview = document.querySelector("#imagePreview");
    imgPriview.src = "";
    inputImage.value = "";
  });
}
//end Review
//sort-select
const sort = document.querySelector("[sort-select]");
if (sort) {
  const urlParams = new URLSearchParams(window.location.search);
  const sortKey = urlParams.get("sortKey");
  const sortValue = urlParams.get("sortValue");

  if (sortKey && sortValue) {
    const selectString = `${sortKey}-${sortValue}`;

    const selectOption = sort.querySelector(`option[value="${selectString}"]`);

    if (selectOption) {
      selectOption.selected = true;
    }
  }
  sort.addEventListener("change", (e) => {
    const [sortKey, sortValue] = e.target.value.split("-");
    urlParams.set("sortKey", sortKey);
    urlParams.set("sortValue", sortValue);
    window.location.search = urlParams.toString();
  });

  const btnClear = document.querySelector("[sort-clear]");
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      urlParams.delete("sortKey");
      urlParams.delete("sortValue");
      window.location.search = urlParams.toString();
    });
  }
}
//end sort-select
