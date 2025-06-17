import {Box, Button, HStack, Image, Input, Popover, Portal, Text, VStack} from "@chakra-ui/react";
import {useState, useMemo} from "react";
import axios from "axios";
import {debounce} from "throttle-debounce";


const AlbumCell = ({title}) => {
    const [albumURL, setAlbumURL] = useState("");
    const [albumSearchResults, setAlbumSearchResults] = useState([]);

    const returnAlbumSearch = useMemo(
        () =>
            debounce(500, (e) => {
                axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${e}&api_key=82d112e473f59ade0157abe4a47d4eb5&format=json`)
                    .then(response => setAlbumSearchResults(response.data.results.albummatches.album))
            }),
        []
    )

    return (
        <VStack>
            <Popover.Root>
                <Popover.Trigger>
                    <VStack gap={1}>
                        {
                            albumURL !== "" ?
                                <Image className={'album-img'} src={albumURL} alt="" />
                                :
                                <Box className={'placeholder-img'} width={150} height={150} backgroundColor={'#222222'}/>
                        }
                        <Text>{title}</Text>
                    </VStack>
                </Popover.Trigger>
                <Portal>
                    <Popover.Positioner>
                        <Popover.Content>
                            <Popover.Arrow />
                            <Popover.Body>
                                <Popover.Title fontWeight="medium" mb={1}>{title}</Popover.Title>
                                <HStack alignItems={'baseline'} mb={2} gap={1}>
                                    <Input placeholder={'Search album or artist names...'} onChange={(e) => returnAlbumSearch(e.target.value)}/>
                                    <Button onClick={() => setAlbumURL("")} size={'sm'} h={'38px'} variant={'surface'}>Clear</Button>
                                </HStack>
                                {
                                    albumSearchResults.slice(0,5).map((album) => (
                                        <Box mt={1} className={'popover-card-item'} onClick={() => setAlbumURL(album.image[3]['#text'])}>
                                            <HStack>
                                                <Image borderRadius={3} w={50} src={album.image[2]['#text']}/>
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