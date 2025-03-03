import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
    [key: string]: ViewStyle | TextStyle;
    container: ViewStyle;
    title: TextStyle;
    item: ViewStyle;
    itemText: TextStyle;
}

const Styles = (
    backgroundColor: string,
    titleFontSize: number,
    itemBackgroundColor: string,
    itemTextFontSize: number): Styles => ({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: titleFontSize,
            fontWeight: '400',
        },
        item: {
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 16,
            backgroundColor: itemBackgroundColor,
        },
        itemText: {
            fontSize: itemTextFontSize,
        },
        box: {
          height: 100,
          backgroundColor: 'violet',
          borderRadius: 20,
          marginVertical: 64,
        },
    });

export default (
    backgroundColor: string,
    titleFontSize: number,
    itemBackgroundColor: string,
    itemTextFontSize: number) =>
    StyleSheet.create(
        Styles(backgroundColor, titleFontSize, itemBackgroundColor, itemTextFontSize)
    );
