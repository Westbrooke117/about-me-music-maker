import {
    Button,
    CloseButton,
    Drawer,
    Icon,
    Input,
    Portal,
    Field,
    HStack,
    Switch,
    VStack,
    Select, createListCollection
} from "@chakra-ui/react";
import { useMemo } from "react";
import {MdOutlineFormatPaint} from "react-icons/md";
import { debounce } from "throttle-debounce";

const SettingsDrawer = ({styles, setStyles}) => {
    const updateStyles = (props) => {
        setStyles(prev => ({...prev, ...props}))
    }

    const debouncedUpdateStyles = useMemo(
        () => debounce(250, (props) => updateStyles(props)),
        [setStyles]
    );

    const fonts = createListCollection({
        items: [
            { label: "Sans-serif", value: "sans-serif"},
            { label: "Serif", value: "serif"},
            { label: "Monospace", value: "monospace"},
            { label: "Cursive", value: "cursive"},
        ]
    })

    return (
        <Drawer.Root>
            <Drawer.Trigger>
                <Button
                    variant={'surface'}
                    size={'xl'}
                >
                    <Icon>
                        <MdOutlineFormatPaint/>
                    </Icon>
                    Customise
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop bg={'transparent'}/>
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Customise Theme</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <VStack h={'100%'} gap={5} alignItems={'flex-start'}>
                                <Field.Root>
                                    <Field.Label>Background Colour</Field.Label>
                                    <HStack w={'100%'}>
                                        <Input w={15} p={0} m={0} type={'color'} value={styles.backgroundColor} onChange={(e) => debouncedUpdateStyles({backgroundColor: e.target.value})}/>
                                        <Input value={styles.backgroundColor}/>
                                    </HStack>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Text Colour</Field.Label>
                                    <HStack w={'100%'}>
                                        <Input w={15} p={0} m={0} type={'color'} value={styles.textColor} onChange={(e) => debouncedUpdateStyles({textColor: e.target.value})}/>
                                        <Input value={styles.textColor}/>
                                    </HStack>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Text Font</Field.Label>
                                    <Select.Root
                                        collection={fonts}
                                        value={[styles.fontFamily ?? "sans-serif"]}
                                        onValueChange={(e) => updateStyles({fontFamily: e.value[0] === "sans-serif" ? null : e.value[0]})}>
                                        <Select.HiddenSelect/>
                                        <Select.Control>
                                            <Select.Trigger>
                                                <Select.ValueText/>
                                            </Select.Trigger>
                                            <Select.IndicatorGroup>
                                                <Select.Indicator/>
                                            </Select.IndicatorGroup>
                                        </Select.Control>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {fonts.items.map((font) => (
                                                    <Select.Item item={font} key={font.value}>
                                                        {font.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Select.Root>
                                </Field.Root>
                                <Switch.Root checked={styles.textIsBold} onCheckedChange={(e) => updateStyles({textIsBold: e.checked})}>
                                    <Switch.Label>Bold Text</Switch.Label>
                                    <Switch.HiddenInput/>
                                    <Switch.Control/>
                                </Switch.Root>
                                <Switch.Root checked={styles.imageBorder} onCheckedChange={(e) => updateStyles({imageBorder: e.checked})}>
                                    <Switch.Label>Image Border</Switch.Label>
                                    <Switch.HiddenInput/>
                                    <Switch.Control/>
                                </Switch.Root>
                                {
                                    styles.imageBorder &&
                                    <Field.Root>
                                        <Field.Label>Image Border Colour</Field.Label>
                                        <HStack>
                                            <Input w={15} p={0} m={0} type={'color'} value={styles.imageBorderColor} onChange={(e) => debouncedUpdateStyles({imageBorderColor: e.target.value})}/>
                                            <Input value={styles.imageBorderColor}/>
                                        </HStack>
                                    </Field.Root>
                                }
                                <Button colorPalette={'red'} alignSelf={'center'} variant={'surface'} mb={3} marginTop={'auto'} onClick={() => {
                                    updateStyles({
                                        backgroundColor: "#09090b",
                                        textColor: "#fafafa",
                                        textIsBold: true,
                                        imageBorder: false,
                                        imageBorderColor: "#fafafa",
                                        fontFamily: null
                                    })
                                }}>Reset Styles to Default</Button>
                            </VStack>
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

export {SettingsDrawer}