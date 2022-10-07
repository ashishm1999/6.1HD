
import React from 'react'
import {Card, Icon} from 'semantic-ui-react'
import tutorials from './tutorials';
import TutorialVideo from './TutorialVideo';

function TutorialsVideoContainer(){
    const tutorialList = tutorials.map((tutorial, index) =>
        <TutorialVideo key={index}
        name={tutorial.name} 
        img = {tutorial.img}
        description = {tutorial.description}
        rating = {tutorial.rating}
        username = {tutorial.username}
        />
    );

    return (

        <Card.Group className='centered'>

            {/* {tutorialList} */}
            <Card>
            <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/NBignVjTNzQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <Card.Content>
                <Card.Header>{tutorials[0].name}</Card.Header>
                <Card.Description>
                {tutorials[0].description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <h3>
                  <Icon name='star' />
                  <span>{tutorials[0].rating} {tutorials[0].username}</span>
                </h3>
              </Card.Content>
            </Card>
            <Card>
            <iframe width="100%" height="315"  src="https://www.youtube.com/embed/DLX62G4lc44" title="Learn React JS - Full Course for Beginners - Tutorial 2019" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <Card.Content>
                <Card.Header>{tutorials[1].name}</Card.Header>
                <Card.Description>
                {tutorials[1].description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <h3>
                  <Icon name='star' />
                  <span>{tutorials[1].rating} {tutorials[1].username}</span>
                </h3>
              </Card.Content>
            </Card>
            <Card>
            <iframe width="100%" height="315"  src="https://www.youtube.com/embed/Ke90Tje7VS0" title="React JS - React Tutorial for Beginners" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <Card.Content>
                <Card.Header>{tutorials[2].name}</Card.Header>
                <Card.Description>
                {tutorials[2].description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <h3>
                  <Icon name='star' />
                  <span>{tutorials[2].rating} {tutorials[2].username}</span>
                </h3>
              </Card.Content>
            </Card>

        </Card.Group>
    
    )
   
}
export default TutorialsVideoContainer