import { useState, useEffect } from "react";
import axios from "axios";
import './BuscarImagens.css';
import ModalImagem from "./ModalImagem";

export default function BuscarImagens(){
    const [uploadImage, setUploadedImage] = useState([]);
    const [imagemAtual, setImagemAtual] = useState(null);
    const [indexAtual, setIndexAtual] = useState(0);
    const [nomeAtual, setNomeAtual] = useState("");

    useEffect(() => {
        const fetchFotos = async () => {
          try {
            const response = await axios.get("http://localhost:3001/fotos");
            setUploadedImage(response.data); // Salva as fotos no estado
            console.log(response.data);
          } catch (error) {
            console.error("Erro ao buscar fotos:", error);
          }
        };
      
        fetchFotos();
      }, []);

      const abrirModal = (index) => {
        setIndexAtual(index);
        setImagemAtual(uploadImage[index].id);
        setNomeAtual(uploadImage[index].nome);
    };

    // Próxima imagem
    const proximaImagem = () => {
        if (indexAtual < uploadImage.length - 1) {
            setIndexAtual(indexAtual + 1);
            setImagemAtual(uploadImage[indexAtual + 1].id);
            setNomeAtual(uploadImage[indexAtual + 1].nome);
        }
    };

    // Imagem anterior
    const imagemAnterior = () => {
        if (indexAtual > 0) {
            setIndexAtual(indexAtual - 1);
            setImagemAtual(uploadImage[indexAtual - 1].id);
            setNomeAtual(uploadImage[indexAtual - 1].nome);

        }
    };

      
    return(
        <>
            <div>
                <span className="fw-bold fs-6">Fotos anexadas:</span>
                <div className="container"> 
                    <div className="row">
                    {uploadImage.map((img, index) => (
                        
                        <div key={index} style={{ textAlign: "center"}} className="col-6">
                            
                                <img src={img.id} alt="Enviada" width="100%" onClick={() => abrirModal(index)}/>
                            
                            <p className="pEnviadoPor"><strong>Enviado por:</strong> {img.nome}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            
            <ModalImagem
                imagens={uploadImage.map(img => img.id)}
                imagemAtual={imagemAtual}
                fecharModal={() => setImagemAtual(null)}
                proximaImagem={proximaImagem}
                imagemAnterior={imagemAnterior}
                nomeAtual={nomeAtual}
            />
         
        </>
    );   
}