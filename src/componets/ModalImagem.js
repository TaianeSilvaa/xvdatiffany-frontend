import React from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa"; // Ícones

export default function ModalImagem({ imagens, imagemAtual, fecharModal, proximaImagem, imagemAnterior, nomeAtual }) {
    if (!imagemAtual) return null;

    return (
        <div style={styles.modalOverlay} onClick={fecharModal}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                
                <button style={styles.leftArrow} onClick={imagemAnterior} disabled={imagens.length <= 1}>
                    <FaArrowLeft size={30} />
                </button>
                <img src={imagemAtual} alt="Imagem Ampliada" style={styles.imagem} />
                <p style={styles.enviadorPor}><strong>Enviado por:</strong> {nomeAtual}</p>
                <button style={styles.rightArrow} onClick={proximaImagem} disabled={imagens.length <= 1}>
                    <FaArrowRight size={30} />
                </button>
            </div>
          
            
        </div>
    );
}

const styles = {
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modalContent: {
        position: "relative",
        maxWidth: "80%",
        maxHeight: "80%",
        textAlign: "center",
    },
    imagem: {
        width: "100%",
        height: "auto",
        borderRadius: "10px",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
    },
    leftArrow: {
        position: "absolute",
        top: "50%",
        left: "-50px",
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
        transform: "translateY(-50%)",
    },
    rightArrow: {
        position: "absolute",
        top: "50%",
        right: "-50px",
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
        transform: "translateY(-50%)",
    },
    enviadorPor:{
        borderRadius: "10px",
        backgroundColor: "#862828",
        color: "white",
        fontSize: "13px",
    },
};
