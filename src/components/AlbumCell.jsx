import { Box, Button, HStack, Image, Input, Popover, Portal, Text, VStack } from "@chakra-ui/react";
import {useState, useCallback} from "react";
import axios from "axios";
import { debounce } from "throttle-debounce";

const AlbumCell = ({ title }) => {
    const [albumURL, setAlbumURL] = useState("");
    const [albumSearchResults, setAlbumSearchResults] = useState([]);

    //Used for album searching popover
    const [open, setOpen] = useState(false);

    const returnAlbumSearch = useCallback(
        debounce(300, (searchTerm) => {
            if (!searchTerm) return;
            axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=82d112e473f59ade0157abe4a47d4eb5&format=json`)
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
                                <Image className={'album-img'} width={150} height={150} src={albumURL} alt="" />
                                :
                                <Box className={'placeholder-img'} width={150} height={150} backgroundColor={'#222222'} />
                        }
                        <Text h={'2.5em'} display={'flex'} alignItems={'start'} lineHeight={'1.2'} textAlign={'center'}>{title}</Text>
                    </VStack>
                </Popover.Trigger>
                <Portal>
                    <Popover.Positioner>
                        <Popover.Content>
                            <Popover.Arrow />
                            <Popover.Body p={3}>
                                <Popover.Title fontWeight="medium" fontSize={16} mb={2}>{title}</Popover.Title>
                                <HStack alignItems={'baseline'} gap={1}>
                                    <Input placeholder={'Search album or artist names...'} onChange={(e) => {
                                        const value = e.target.value;
                                        returnAlbumSearch(value);
                                    }} />
                                    <Button onClick={() => {
                                        setAlbumURL("")
                                        setOpen(false);
                                    }} size={'sm'} h={'38px'} variant={'surface'}>Clear</Button>
                                </HStack>
                                {
                                    albumSearchResults.slice(0, 5).map((album) => (
                                        <Box mt={1} className={'popover-card-item'} onClick={() => {
                                            setAlbumURL(album.image[3]['#text'])
                                            setOpen(false)
                                        }}>
                                            <HStack>
                                                <Image borderRadius={3} w={50} src={album.image[2]['#text']} />
                                                <VStack gap={0} alignItems={'left'}>
                                                    <Text maxW={215} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{album.name}</Text>
                                                    <Text maxW={215} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'} color={'dimgray'}>{album.artist}</Text>
                                                </VStack>
                                            </HStack>
                                        </Box>
                                    ))
                                }
                            </Popover.Body>
                        </Popover.Content>
                    </Popover.Positioner>
                </Portal>
            </Popover.Root>
        </VStack>
    )
}

export { AlbumCell }