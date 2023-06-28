export  const handleClientSubmit = async ({event,setFormData, formData, setAdd, attachment, router}) => {
    event.preventDefault();

    setAdd(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: formData?.clientId,
      clientName: formData?.clientName,
      gender: formData?.gender[0],
      ClientImage: `${attachment}`,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/addclient", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setAdd(false);
        if (result === "Client added successfully") {
          setFormData({
            clientName: "",
            gender: [],
            clientId: 0,
            clientImage: null,
          });
          alert(
            "Client added successfully, Please Proceed to add your project"
          );
          router.push("/addproject");
        }
      })
      .catch((error) => console.log("error", error));
  };


export  const handleClientEdit = async ({event,setFormData, formData, setAdd, attachment, router, searchParams }) => {
    event.preventDefault();

    setAdd(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: formData?.clientId,
      clientName: formData?.clientName,
      gender: formData?.gender[0],
      ClientImage: `${attachment}`,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/editclient/${searchParams.get("cid")}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setAdd(false);
        if (result === "Item updated successfully") {
          setFormData({
            clientName: "",
            gender: [],
            clientId: 0,
            clientImage: null,
          });
          alert(
            "Client edited successfully, Please Proceed to edit your project also."
          );
          router.push("/addproject");

          localStorage.setItem("id", `${searchParams.get("q")}`);
        }
      })
      .catch((error) => console.log("error", error));
  };
