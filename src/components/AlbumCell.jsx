import { Box, Button, HStack, Image, Input, Popover, Portal, Text, VStack } from "@chakra-ui/react";
import {useState, useCallback} from "react";
import axios from "axios";
import { debounce } from "throttle-debounce";
import {Harmonizer} from "color-harmony";
const harmonizer = new Harmonizer();

const AlbumCell = ({title, styles}) => {
    const [albumURL, setAlbumURL] = useState("");
    const [albumSearchResults, setAlbumSearchResults] = useState([]);

    //Used for popover
    const [open, setOpen] = useState(false);

    const returnAlbumSearch = useCallback(
        debounce(300, (searchTerm) => {
            if (!searchTerm) return;
            axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(searchTerm)}&api_key=82d112e473f59ade0157abe4a47d4eb5&format=json`)
                .then(response => {
                    setAlbumSearchResults(response.data.results.albummatches.album);
                })
                .catch(err => console.error(err));
        }),
        []
    );

    return (
        <VStack>
            <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Popover.Trigger>
                    <VStack gap={1}>
                        {
                            albumURL !== "" ?
                                <Image border={styles.imageBorder === false ? 'none' : `2px solid ${styles.imageBorderColor}`} className={'album-img'} width={150} height={150} src={albumURL} alt="" />
                                :
                                <Box border={styles.imageBorder === false ? 'none' : `2px solid ${styles.imageBorderColor}`} className={'placeholder-img'} width={150} height={150} backgroundColor={harmonizer.tints(styles.backgroundColor, 'complementary')[1]} _hover={{'backgroundColor': harmonizer.tints(styles.backgroundColor, 'complementary')[3]}}/>
                        }
                        <Text h={'2.5em'} display={'flex'} alignItems={'start'} lineHeight={'1.2'} textAlign={'center'}>{title}</Text>
                    </VStack>
                </Popover.Trigger>
                <Portal>
                    <Popover.Positioner>
                        <Popover.Content maxH={350} display={'flex'} flexDirection={'column'}>
                            <Popover.Arrow />
                            <Box p={2} flexShrink={0}>
                                <HStack alignItems={'center'} justifyContent={'space-between'}>
                                    <Popover.Title fontWeight={"semibold"} fontSize={16} pl={1}>{title}</Popover.Title>
                                    {
                                        albumURL &&
                                        <Button onClick={() => {
                                            setAlbumURL("")
                                        }} size={'2xs'} colorPalette={'red'} variant={'surface'} mr={1}>Clear</Button>
                                    }
                                </HStack>
                                <Input mt={2} placeholder={'Search for album or artist names...'} variant={'outline'} onChange={(e) => {
                                    const value = e.target.value;
                                    returnAlbumSearch(value);
                                }} />
                            </Box>
                            {albumSearchResults.length > 0 && (
                                <Popover.Body p={1} overflow={'scroll'} flex={1}>
                                {
                                    albumSearchResults.map((album) => (
                                        <Box _hover={{backgroundColor: "gray.900"}} p={2} borderRadius={'md'} className={'popover-card-item'} onClick={() => {
                                            setAlbumURL(album.image[3]['#text'])
                                            setOpen(false)
                                        }}>
                                            <HStack gap={3}>
                                                <Image
                                                    borderRadius={'sm'}
                                                    boxSize={"40px"}
                                                    fallback={<Box boxSize="40px" bg="gray.200" borderRadius="sm" />}
                                                    src={album.image[2]['#text'] || null} />
                                                <VStack gap={0} align={'start'} overflow={'hidden'}>
                                                    <Text maxW={215} fontSize={'sm'} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{album.name}</Text>
                                                    <Text maxW={215} fontSize={'xs'} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'} color={'dimgray'}>{album.artist}</Text>
                                                </VStack>
                                            </HStack>
                                        </Box>
                                    ))
                                }
                            </Popover.Body>
                            )}
                        </Popover.Content>
                    </Popover.Positioner>
                </Portal>
            </Popover.Root>
        </VStack>
    )
}

export { AlbumCell }