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
    const [styles, setStyles] = useState({
        backgroundColor: "#09090b",
        textColor: "#fafafa",
        textIsBold: true,
        imageBorder: false,
        imageBorderColor: "#fafafa",
        fontFamily: null
    })

    useEffect(() => {
        document.body.style.backgroundColor = styles.backgroundColor;
    }, [styles.backgroundColor]);

    return (
        <Container pt={5} maxW={'7xl'} px={{ base: 2, sm: 4 }}>
            <Flex justifyContent={'center'} pb={3}>
                <Heading fontSize={{ base: 'xl', sm: '2xl' }} textAlign={'center'} color={styles.textColor} fontFamily={styles.fontFamily}>About Me Music Maker</Heading>
            </Flex>
            <Flex justifyContent={'center'}>
                <Box ref={wrapperRef} p={{ base: 2, sm: 3 }} bg={styles.backgroundColor} color={styles.textColor} fontWeight={styles.textIsBold === true ? 'semibold' : 'normal'} fontFamily={styles.fontFamily}>
                    <Grid
                        className={'music-grid'}
                        data-grid={'music-grid'}
                        templateColumns={{
                            base: 'repeat(2, minmax(0, 150px))',
                            sm: 'repeat(3, 150px)',
                            md: 'repeat(4, 150px)',
                            lg: 'repeat(6, 150px)',
                        }}
                        gap={3}
                        justifyContent={'center'}
                        maxW={'6xl'}
                    >
                        {
                            topics.map((topic, topicIndex) => (
                                <GridItem key={topicIndex} display={'flex'} justifyContent={'center'}>
                                    <AlbumCell styles={styles} title={topic} />
                                </GridItem>
                            ))
                        }
                    </Grid>
                </Box>
            </Flex>
            <Flex mt={5} pb={8} justifyContent={"center"} gap={5} flexWrap={'wrap'}>
                <SettingsDrawer styles={styles} setStyles={setStyles}/>
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
