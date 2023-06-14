import styled from 'src/lib/mui/styled';

const FolderStyles = styled('div')`
  #folder {
    .header {
      display: flex;
      align-items: center;
      gap: 3rem;
    }
    .placeholder {
      color: steelblue;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      &_item {
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .home {
      cursor: pointer;
      color: #163a73;
      transition: 0.5s ease;
      &:hover {
        opacity: 0.5;
      }
    }
    .back {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      &:hover {
        text-decoration: underline;
      }
    }
    .folder {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: 0.5s ease;
      text-align: center;
      &:hover {
        opacity: 0.6;
      }
    }

    .image-card {
      width: 30vw;
      height: 30vw;
      object-fit: cover;
    }

    #lightbox-img {
      height: 80vh;
      max-width: 90vw;
      object-fit: cover;
    }

    #lightbox {
      z-index: 99999;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(19, 19, 19, 0.941);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /*Completely optional styling that has nothing to do with the lightbox*/
    button {
      color: white;
      border: 2px solid #a167da;
      background-color: #a167da;
      font-size: 1.2rem;
    }

    a {
      color: #7a4baa;
    }

    h1 {
      color: #7a4baa;
    }

    p {
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }

    img:hover,
    button:hover {
      cursor: pointer;
    }
  }

  .image-card {
    width: 30vw;
    height: 30vw;
    object-fit: cover;
  }

  #lightbox-img {
    height: 80vh;
    max-width: 90vw;
    object-fit: cover;
  }

  #lightbox {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default FolderStyles;
