import './App.css'
import {AlbumCell} from "./components/AlbumCell.jsx";
import {Button, Container, Flex, Grid, GridItem, Heading} from "@chakra-ui/react";
import {ExportAsImage} from "./ExportAsImage.js";
import {useRef} from "react";

function App() {
    const topics = [
        'Favourite Album',
        'Best Narrative',
        'Favourite Cover',
        "I'll Listen Someday",
        'Personal Impact',
        'Bad Day Cure',
        "You Enjoy but Most Don't",
        "You Don't Enjoy but Most Do",
        'Underrated',
        'Overrated',
        "Not Usually My Thing, But...",
        'Best Instrumental',
        'Best Vocals',
        'Simple but Fun',
        'Best Mixtape',
        'Most Consistent Discography',
        'Biggest Letdown',
        'Biggest Surprise',
        'Best Soundtrack',
        'Most Unique',
        'Favourite Band',
        'Favourite Solo Artist',
        'Best EP',
        'Most Depressing'
    ]
    const mainComponent = useRef(null);

  return (
    <Container pt={5} maxW={'5xl'}>
        <Flex pb={5} justifyContent={"center"}>
            <Heading fontSize={'2xl'}>About Me: Music Maker</Heading>
        </Flex>
        <Grid ref={mainComponent} templateColumns={'repeat(6, 1fr)'} gap={3}>
            {
                new Array(4).fill(0).map((_, rowIndex) => (
                    new Array(6).fill(0).map((_, colIndex) => {
                        const topicIndex = rowIndex * 6 + colIndex;
                        return (
                            <GridItem>
                                <AlbumCell title={topics[topicIndex]}/>
                            </GridItem>
                        )
                    })
                ))
            }
        </Grid>
        <Flex mt={5} justifyContent={'center'}>
            <Button variant={'surface'} size={'xl'} onClick={() => {
                ExportAsImage(mainComponent.current)
            }}>Save As Image</Button>
        </Flex>
    </Container>
  )
}

export default App
