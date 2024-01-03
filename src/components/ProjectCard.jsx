import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MacbookFrame from '../assets/MacbookFrame.webp';
import IphoneFrame from '../assets/IphoneFrame.webp';

const SectionDiv = styled('div')(({ theme, isLast }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 'auto',
  position: 'relative',
  marginBottom: isLast ? '-30vh' : '10vh',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
  }
}));

const TextBox = styled('div')(({ theme, textOpacity, isLast }) => ({
  position: 'fixed',
  top: '50%',
  left: '5%',
  width: '20%',
  textAlign: 'center',
  transform: 'translateY(-50%)',
  opacity: textOpacity,
  transition: 'opacity 0.1s',
  padding: '0 20px',

  [theme.breakpoints.down('md')]: {
    position: 'relative',
    transform: 'none',
    left: '0',
    top: '5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    width: 'auto',
    textAlign: 'center',
    padding: '4rem',
    marginTop: isLast ? '-500px' : '-500px',
    opacity: textOpacity,
  }
}));

const TextBoxPlaceholder = styled('div')({
  position: 'relative',
  top: '50%',
  left: '20%',
  marginLeft: '5%',
  width: '20%',
  height: 'auto',
  transform: 'translateY(-50%)',
  padding: '0 20px',
});

const ImageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'visible',
  height: 'auto',
  width: '100%',
  willChange: 'transform, opacity',
  [theme.breakpoints.down('md')]: {
    marginTop: '200px',
  }
}));


const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  borderRadius: '5px',
  padding: '10px 10px',
  fontSize: '1rem',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
  },
}));

const modalStyle = {
  position: 'absolute',
  width: '165%',
  height: '150%',
  left: '-50%',
  top: '-50%',
  backgroundColor: 'rgba(0, 0, 0, .5)',
  zIndex: '1000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

function ProjectCard({ project, isLast }) {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [textOpacity, setTextOpacity] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 500, height: 500 });
  const [imageTransforms, setImageTransforms] = useState([]);
  const [initialSetupComplete, setInitialSetupComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [originalTransforms, setOriginalTransforms] = useState({});
  const [showButtons, setShowButtons] = useState(false);
  
  useEffect(() => {
      const handleScroll = () => {
        if (sectionRef.current && imageContainerRef.current) {
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const start = sectionRect.top - windowHeight;
          const end = sectionRect.bottom + windowHeight;
          const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          const progress = Math.max(0, Math.min(1, -start / (end - start - window.innerHeight)));
    
          const images = imageContainerRef.current.querySelectorAll('img');
          const lastImage = images[images.length - 1];
          const lastImageRect = lastImage.getBoundingClientRect();
          
          const visibleHeight = Math.max(0, lastImageRect.bottom - 0);
          const totalHeight = lastImageRect.height;
          const visibleRatio = visibleHeight / totalHeight;
    
          let opacityBasedOnScroll = 0;
          if (sectionRect.top <= windowHeight * 0.9) {
            const fadeInStart = windowHeight * 0.9;
            opacityBasedOnScroll = Math.min(1, (fadeInStart - sectionRect.top) / (windowHeight * 0.2));
          }
          
          if (progress >= 0.75) {
            opacityBasedOnScroll = 0;
          }
    
          let opacityBasedOnImage = 1;
          if (visibleRatio < 0.5) {
            opacityBasedOnImage = visibleRatio * 2;
          }
    
          setTextOpacity(Math.min(opacityBasedOnScroll, opacityBasedOnImage));

          if (screenWidth > 900) {
            const newImageTransforms = project.images.map((_, index) =>
            calculateImageTransform(index, progress, imageContainerRef).transform
          );
          setImageTransforms(newImageTransforms);
          } else {
            const fixedTransforms = project.images.map((image, index) =>
              calculateFixedTransform(index, image.frame)
            );
            setImageTransforms(fixedTransforms);
          }
          } 
      };
    
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [project.images]);

  useLayoutEffect(() => {
    if (imageContainerRef.current) {
      const { clientWidth, clientHeight } = imageContainerRef.current;
      setContainerSize({ width: clientWidth, height: clientHeight });
      setInitialSetupComplete(true);
    }
  }, []);
  
  useEffect(() => {
    if (initialSetupComplete) {
      const initialTransforms = project.images.map((_, index) =>
        calculateImageTransform(index, 0.9, imageContainerRef).transform
      );
      setImageTransforms(initialTransforms);
    }
  }, [containerSize]);

  useEffect(() => {
    const delay = 300;

    if (textOpacity > 0) {
      setShowButtons(true);
    } else {
      const timer = setTimeout(() => setShowButtons(false), delay);
      return () => clearTimeout(timer);
    }
  }, [textOpacity]);

  const handleImageClick = (event) => {
    if (modalOpen) handleCloseModal();
    const imageContainerElement = event.target.closest('.image-container');
  
    if (imageContainerElement) {
      const index = parseInt(imageContainerElement.getAttribute('data-index'), 10);
      if (!isNaN(index)) {
        const currentTransform = imageTransforms[index] || '';
  
        setOriginalTransforms({ ...originalTransforms, [index]: currentTransform });
  
        const newTransform = calculateTransformForModal(index, imageContainerElement);
        const newImageTransforms = [...imageTransforms];
        newImageTransforms[index] = newTransform;
        setImageTransforms(newImageTransforms);
  
        setSelectedImageIndex(index);
        setModalOpen(true);
        document.body.classList.add('no-scroll');
      }
    }
  };
  
  
  
  const handleCloseModal = () => {
    setTimeout(() => {
      if (selectedImageIndex !== null) {
        const initialTransform = originalTransforms[selectedImageIndex] || '';
        const newImageTransforms = [...imageTransforms];
        newImageTransforms[selectedImageIndex] = initialTransform;
        setImageTransforms(newImageTransforms);
      }
    }, 1);
    setTimeout(() => {
      setModalOpen(false);
      document.body.classList.remove('no-scroll');
      setSelectedImageIndex(null);
      setOriginalTransforms({});
    }, 500);
  };

  const calculateTransformForModal = (index, containerElement) => {
    if (!(containerElement instanceof Element)) {
      console.error('containerElement is not a DOM element:', containerElement);
      return '';
    }
  
    const currentTransform = window.getComputedStyle(containerElement).transform;
    const matrix = new DOMMatrixReadOnly(currentTransform);
    const rect = containerElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    let isIphone = rect.height / rect.width > 1;
  
    let targetScale;
    if (isIphone) {
      targetScale = Math.min(viewportHeight / rect.height * 0.98, 2);
    } else {
      const scaleBasedOnWidth = viewportWidth / rect.width * 0.95;
      const scaleBasedOnHeight = viewportHeight / rect.height * 0.95;
      targetScale = Math.min(Math.min(scaleBasedOnWidth, scaleBasedOnHeight), 2);
    }
  
    const centeredX = (viewportWidth - rect.width) / 2;
    const centeredY = (viewportHeight - rect.height) / 2;
  
    const translateX = centeredX - (rect.left - matrix.e);
    const translateY = centeredY - (rect.top - matrix.f);
  
    return `matrix(${targetScale * matrix.a}, 0, 0, ${targetScale * matrix.d}, ${translateX}, ${translateY})`;
  };

  const calculateFixedTransform = (index, frameType) => {
    const isMobileFrame = project.images[index].frame === 'mobile';
    const containerWidth = imageContainerRef.current ? imageContainerRef.current.clientWidth : 0;
    let horizontalPosition, verticalOffset, scale;
  
    if (isMobileFrame) {
      scale = calculateScale(containerWidth, 1400, 0.5, 0.7); // Adjust values as needed
      horizontalPosition = index === 1 ? '20%' : index === 2 ? '-20%' : '0%';
      verticalOffset = (index * -325) - 50;
    } else {
      scale = calculateScale(containerWidth, 500, 0.7, 0.9); // Adjust values as needed
      horizontalPosition = index === 1 ? '0%' : index === 2 ? '0%' : '0%';
      verticalOffset = (index * -40) - 200;
    }
  
    const verticalMovement = index * 10;
    return `translateX(${horizontalPosition}) translateY(${verticalMovement + verticalOffset}px) scale(${scale})`;
  };
  
  const calculateScale = (containerWidth, baseWidth, minScale, maxScale) => {
    let scale = containerWidth / baseWidth;
    scale = Math.max(scale, minScale);
    scale = Math.min(scale, maxScale);
    return scale;
  };
  

  const calculateImageTransform = (index, progress, imageContainerRef) => {
    const isMobileFrame = project.images[index].frame === 'mobile';
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    const containerWidth = imageContainerRef.current ? imageContainerRef.current.clientWidth : 0;
    let verticalMovement = 0;
  
    let scaleMultiplier;
    switch (index) {
      case 2:
        scaleMultiplier = 1.05;
        break;
      case 3:
        scaleMultiplier = 1.05;
        break;
      default:
        scaleMultiplier = 0.9;
    }
    let scale;

    if (isMobileFrame) {
      scale = scaleMultiplier - index * 0.1;
      verticalMovement = -(progress - .1) * (50 + index * 60);
    } else {
      verticalMovement = -(progress - .1) * (50 + index * 40);
      scale = scaleMultiplier - index * 0.1;
    }

    const scaleFactor = isMobileFrame ? Math.min(containerWidth / 700, 1) : Math.min(containerWidth / 400, 1);
    const minScale = 0.5;
    scale = Math.max(scale * scaleFactor, minScale);
  
    const baseVerticalOffset = .000005;
    let horizontalPosition = 0;
  
    if (isMobileFrame) {
      if (screenWidth <= 900) {
        horizontalPosition = index === 1 ? '30%' : index === 2 ? '-30%' : 0;
      } else {
        horizontalPosition = index === 1 ? '40%' : index === 2 ? '-40%' : 0;
      }
    } else {
      horizontalPosition = index === 1 ? '10%' : index === 2 ? '-10%' : 0;
    }
  
    const verticalOffset = index * baseVerticalOffset;
    const transform = `translateX(${horizontalPosition}) translateY(${verticalMovement + verticalOffset}vh) scale(${scale})`;
    return { transform };
  };
  
  return (
    <SectionDiv isLast={isLast} ref={sectionRef}>
      <Box sx={{
        position: 'fixed',
        top: '16px',
        left: '16px',
        fontSize: '2rem',
        fontWeight: 'bold',
        opacity: textOpacity,
        transition: 'opacity 0.3s'
      }}>
        {project.number}
      </Box>
      <Box sx={{
        fontFamily: 'Neureal',
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        fontSize: '2rem',
        opacity: textOpacity,
        transition: 'opacity 0.3s'
      }}>
        {project.type}
      </Box>
      <Grid item xs={12} md={4}>
      <TextBoxPlaceholder/>
      <TextBox textOpacity={textOpacity} isLast={isLast}>
            <Typography fontFamily="Neureal" variant="h3" gutterBottom>
              {project.name}
            </Typography>
            <Typography paddingTop="2rem" paddingBottom="2rem" variant="body1" paragraph>
              {project.description}
            </Typography>
            <Typography variant="body1" style={{ marginTop: showButtons ? '1rem' : '-5rem' , marginBottom: '1rem'}}>
              <strong>Tech Stack:</strong> {project.techStack.join(", ")}
            </Typography>
            {showButtons ? (
              <>
                {project.link && (
                  <StyledButton
                    variant="contained"
                    href={project.link}
                  >
                    View Project
                  </StyledButton>
                )}
                <StyledButton
                  variant="outlined"
                  href={project.githubLink}
                >
                  View on GitHub
                </StyledButton>
              </>
            ) : (
              <>
              </>
            )}
          </TextBox>
      </Grid>
        <Grid item xs={12} md={8}>
        <ImageContainer ref={imageContainerRef} onClick={handleImageClick}>
        {modalOpen && (
          <div style={modalStyle} onClick={handleCloseModal}></div>
        )}
        {project.images.map((image, index) => {
          const isSelected = index === selectedImageIndex;
          const transform = imageTransforms[index] || '';
          let zIndex =  isSelected ? '1010' : project.images.length - index;
          if (image.frame === 'mobile') {
            zIndex += 10;
          }
          if (index === 2) {
            zIndex += 15;
          }
          
          return (
            <div
              key={index}
              className={`image-container image-container-${index}`}
              data-index={index}
              style={{
                transform,
                transition: isSelected ? 'transform 0.5s ease' : 'none',
                position: 'relative',
                zIndex: isSelected ? 100000 : zIndex,
                transformOrigin: 'center center',
                cursor: 'pointer',
              }}
            >
                <img
                  src={image.frame === 'desktop' ? MacbookFrame : IphoneFrame}
                  alt={image.frame === 'desktop' ? 'Macbook' : 'Iphone'}
                  style={{ width: '100%', height: '100%' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: image.frame === 'desktop' ? '-5.5%' : '2.1%',
                    left: image.frame === 'mobile' ? '5%' : undefined,
                    width: image.frame === 'mobile' ? '90%' : '100%',
                    height: image.frame === 'desktop' ? '110%' : '95.2%',
                    backgroundImage: `url(${image.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: '-1',
                    borderRadius: image.frame === 'mobile' ? '10px' : undefined,
                    transform: image.frame === 'desktop' ? 'scale(0.733)' : 'scale(0.993)',
                  }}
                />
              </div>
            );
          })}
          </ImageContainer>
        </Grid>
    </SectionDiv>
  );
}

export default ProjectCard;