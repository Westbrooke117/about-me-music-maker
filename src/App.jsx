import './App.css'
import {AlbumCell} from "./components/AlbumCell.jsx";
import {Box, Button, Container, Flex, Grid, GridItem, Heading} from "@chakra-ui/react";
import {ExportAsImage} from "./ExportAsImage.js";
import {useRef} from "react";
import ReactGA from "react-ga4";

ReactGA.initialize("G-MQPBH2HY6Q");

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
    const wrapperRef = useRef(null);

  return (
    <Container pt={5} maxW={'5xl'}>
        <Flex pb={5} justifyContent={"center"}>
            <Heading fontSize={'2xl'}>About Me Music Maker</Heading>
        </Flex>
        <Box ref={wrapperRef}>
            <Grid templateColumns={'repeat(6, 1fr)'} gap={3}>
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
        </Box>
        <Flex mt={5} justifyContent={'center'}>
            <Button variant={'surface'} size={'xl'} onClick={() => {
                ExportAsImage(wrapperRef.current)
            }}>Save As Image</Button>
        </Flex>
    </Container>
  )
}

export default App
