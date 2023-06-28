export const handleProjectSubmit = async ({
  event,
  formData,
  setFormData,
  setAdd,
  router,
  setEdit
}) => {
  event.preventDefault();
  setAdd(true);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: formData?.projectId,
    projectName: formData?.projectName,
    projectStatus: formData?.projectStatus[0],
  });
  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("/additem", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      setAdd(false);
      if (result === "Item added successfully") {
        setFormData({ projectName: "", projectStatus: [], projectId: 0 });
        alert("Item added successfully");
        router.push("/");
      }
    })
    .catch((error) => console.log("error", error));
};

export const handleProjectEdit = async ({ event,
    formData,
    setFormData,
    setAdd,
    router, setEdit}) => {
  event.preventDefault();
  setEdit(true);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: localStorage.getItem("id"),
    projectName: formData?.projectName,
    projectStatus: formData?.projectStatus[0],
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`/editproject`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      setEdit(false);
      if (result === "Item added successfully") {
        localStorage.clear();
        alert("Project updated successfully");
        router?.push("/");
        setFormData({ projectName: "", clientName: "", projectStatus: [] });
      }
    })
    .catch((error) => console.log("error", error));
};
