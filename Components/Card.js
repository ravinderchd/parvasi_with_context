import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { useState } from 'react/cjs/react.production.min';


const Card = (props) => {
  

  
   const {imgSrc} = props;
  
  console.log("Width===", width);
  console.log("Image src===",props)
  return (
   <Container>
		<Cover>
			<Image source = {props.imgSrc} />
		</Cover>
		
       <Content>
			<Title>{props.label}</Title>
			
		</Content>
	</Container>
  )
}
const width = Dimensions.get('window').width;
const iconWidth = Math.round(width/2)-3;
//const iconHeight = Math.round(width/2)-86;
const iconHeight = 100;
const Container = styled.View`
	background: #fff;
	  
	width: ${iconWidth}px;

	margin: 1px;
	margin-top: 1px;
	
`;
const ArrowView = styled.View `
    flex-direction: row ;
    position: absolute;
    left:0 ;
`

const Cover = styled.View`

	height: 101px;
    width: ${iconWidth}px;
	overflow: hidden;
    box-shadow: 0 1px 15px rgba(255, 0, 0, 0.45);
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;border-radius: 10px;

`;

const Content = styled.View`
	padding: 6px;
	flex-direction: column;
	align-items: center;
    margin-top:1px ;
	
	
   background-color: #f00;
    border-radius: 10px ;
	
    border-radius: 14px;
    border-color: '#ff0000';
`;

const Title = styled.Text`
	color: #fff;
	font-size: 20px;
	font-weight: 600;
   
    font-size: 14px;
`;

const PriceCaption = styled.Text`
	color: #b8b3c3;
	font-size: 15px;
	font-weight: 600;
	margin-top: 4px;
`;
export default Card
