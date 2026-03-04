import './App.css'
import { AlbumCell } from "./components/AlbumCell.jsx";
import {Box, Button, Container, Flex, Grid, GridItem, Heading, Icon} from "@chakra-ui/react";
import { ExportAsImage } from "./ExportAsImage.js";
import {useEffect, useRef, useState} from "react";
import ReactGA from "react-ga4";
import {SettingsDrawer} from "./components/SettingsDrawer.jsx";
import { MdOutlineSaveAlt } from "react-icons/md";

ReactGA.initialize("G-MQPBH2HY6Q");

function App() {
    const topics = [
        'Favourite Album',
        'Best Narrative',
        'Favourite Cover Art',
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
    const [isSavingImage, setIsSavingImage] = useState(false);

    // Theme state
    const [backgroundColor, setBackgroundColor] = useState("#09090b")
    const [textColor, setTextColor] = useState("#fafafa")
    const [textIsBold, setTextIsBold] = useState(true)

    useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
    }, [backgroundColor]);

    return (
        <Container pt={5} maxW={'7xl'}>
            <Flex justifyContent={'center'} pb={3}>
                <Heading fontSize={'2xl'} color={textColor}>About Me Music Maker</Heading>
            </Flex>
            <Flex justifyContent={'center'}>
                <Box ref={wrapperRef} p={3} bg={backgroundColor} color={textColor} fontWeight={textIsBold === true ? 'semibold' : 'normal'}>
                    <Grid templateColumns={'repeat(6, 150px)'} gap={3} maxW={'6xl'}>
                        {
                            new Array(4).fill(0).map((_, rowIndex) => (
                                new Array(6).fill(0).map((_, colIndex) => {
                                    const topicIndex = rowIndex * 6 + colIndex;
                                    return (
                                        <GridItem key={topicIndex}>
                                            <AlbumCell backgroundColor={backgroundColor} title={topics[topicIndex]} />
                                        </GridItem>
                                    )
                                })
                            ))
                        }
                    </Grid>
                </Box>
            </Flex>
            <Flex mt={5} justifyContent={"center"} gap={5}>
                <SettingsDrawer
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColor}

                    textColor={textColor}
                    setTextColor={setTextColor}

                    textIsBold={textIsBold}
                    setTextIsBold={setTextIsBold}
                />
                <Button
                    variant={'surface'}
                    size={'xl'}
                    loading={isSavingImage}
                    loadingText={'Saving...'}
                    onClick={() => {
                        setIsSavingImage(true)
                        ExportAsImage(wrapperRef.current, setIsSavingImage)
                }}>
                    <Icon><MdOutlineSaveAlt/></Icon>
                    Save Image</Button>
            </Flex>
        </Container>
    )
}

export default App
