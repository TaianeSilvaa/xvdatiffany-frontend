import { useState, useEffect } from "react";
import './UploadFotos.css';
import axios from "axios";
import { Button, Modal } from 'react-bootstrap';
import { BsCardImage } from "react-icons/bs";
import "@fontsource/italianno";

export default function UploadFotos() {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [logado, setLogado] = useState(false);
  const [nome, setNome] = useState("");
  const [modalAvisoEnviarFoto, setModalAvisoEnviarFoto] = useState(false);
  const [uploadImage,setUploadedImage] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
    console.log(files.length);

    if (images.length + files.length > 10) {
      alert("Você pode adicionar no máximo 10 fotos.");
      return;
    }

    setModalAvisoEnviarFoto(true);

    
    
    /*// Atualiza o estado com as novas imagens
    setImages((prevImages) => [...prevImages, ...files]);

    // Cria pré-visualizações
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert("Selecione pelo menos uma imagem.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Upload realizado com sucesso!");
      console.log("Imagens enviadas:", response.data.files);
      setImages([]);
      setPreviews([]);
    } catch (error) {
      console.error("Erro ao enviar imagens:", error);
      alert("Erro ao enviar imagens.");
    }*/
  };

  useEffect(() => {
    const userLogged = localStorage.getItem("userLogged");
    if (userLogged === "true") {
      setLogado(true);
    }
  }, []);

  // Função para lidar com o clique do botão
  const handleButtonClick = () => {
    if (logado) {
      document.getElementById("inputFoto").click();
    } else {
      setShowModal(true);
    }
  };
  const enviarFoto = async () => {
    if (images.length === 0) {
      alert("Selecione pelo menos uma imagem.");
      return;
    }
  
    // Inicializa corretamente o FormData antes de usá-lo
    const formData = new FormData();
    images.forEach((image) => formData.append("file", image));

    const nomeUsuario = localStorage.getItem("nome") || "Anônimo";
    formData.append("nome", nomeUsuario);
  
    try {
      const response = await axios.post("http://localhost:3001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setUploadedImage([...uploadImage, { link: response.data.link, nome: nomeUsuario }]); // Salva o link da imagem enviada
      alert("Upload realizado com sucesso!");
      setModalAvisoEnviarFoto(false);
      window.location.reload();

    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar imagens.");
    }
  };

  // Simulação de login
  const handleLogin = (nomeUsuario) => {
    //console.log(nomeUsuario);
    localStorage.setItem("userLogged", "true"); // Salva no navegador
    localStorage.setItem("nome",nome);
    setLogado(true);
    setShowModal(false); // Fecha a modal
    document.getElementById('inputFoto').click();
  };

  return (
    <>
    <div>
      <input type="file" id="inputFoto" multiple accept="image/*" onChange={handleImageUpload} disabled={images.length >= 10} style={{ display: "none" }}/>
      <div className="container">
        <span className="shadow-text">15 anos</span>
        <span className="script-text">Tiffany</span>
      </div>
      
      <Button variant="danger" id="buttonImagem" onClick={handleButtonClick}><BsCardImage /> Faça parte dessa história</Button>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {previews.map((src, index) => (
          <img key={index} src={src} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }} />
        ))}
      </div>

   
    </div>

    {/* Modal para Login */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Faça Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você precisa estar logado para enviar uma foto.</p>
          <div className="mb-2">
            <input type="text" id="inputNome" placeholder="Nome e sobrenome" value={nome} onChange={(e) => setNome(e.target.value)}></input>
          </div>
          <Button variant="danger" onClick={() => handleLogin(nome)}>
            Fazer Login
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={modalAvisoEnviarFoto} onHide={() => setModalAvisoEnviarFoto(false)}>
        
        <Modal.Body>
          <p className="fw-bold">Você vai enviar {images.length} fotos, deseja confirmar?</p>
          <p className="pAvisoFotoExcluir">Depois de anexar não será possível excluir as fotos.</p>
          <div className="d-flex justify-content-center align-items-center">
            <Button variant="danger" className="m-2" onClick={() => enviarFoto()}>
              Confirmar
            </Button>
            <Button variant="secondary" className="m-2" onClick={() => setModalAvisoEnviarFoto(false)}>
              Cancelar
            </Button>
          </div>
          
          
        </Modal.Body>
      </Modal>
    </>
  );
}
