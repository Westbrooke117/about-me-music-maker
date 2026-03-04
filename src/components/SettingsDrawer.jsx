import {Button, CloseButton, Drawer, Icon, Input, Portal, Field, HStack, Switch} from "@chakra-ui/react";
import {MdOutlineFormatPaint} from "react-icons/md";

const SettingsDrawer = ({setBackgroundColor, backgroundColor, setTextColor, textColor, setTextIsBold, textIsBold}) => {
    const updateBackgroundColor = (colourHex) => {
        setBackgroundColor(colourHex);
    }

    const updateTextColor = (colourHex) => {
        setTextColor(colourHex);
    }

    const toggleBoldText = (value) => {
        console.log(value)
        setTextIsBold(value);
    }

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
                            <Field.Root mb={5}>
                                <Field.Label>Background Colour</Field.Label>
                                <HStack>
                                    <Input w={15} p={0} m={0} type={'color'} value={backgroundColor} onChange={(e) => updateBackgroundColor(e.target.value)}/>
                                    <Input value={backgroundColor}/>
                                </HStack>
                            </Field.Root>
                            <Field.Root mb={5}>
                                <Field.Label>Text Colour</Field.Label>
                                <HStack>
                                    <Input w={15} p={0} m={0} type={'color'} value={textColor} onChange={(e) => updateTextColor(e.target.value)}/>
                                    <Input value={textColor}/>
                                </HStack>
                            </Field.Root>
                            <Switch.Root defaultChecked={textIsBold} onCheckedChange={(e) => toggleBoldText(e.checked)}>
                                <Switch.Label>Bold Text</Switch.Label>
                                <Switch.HiddenInput/>
                                <Switch.Control/>
                            </Switch.Root>
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