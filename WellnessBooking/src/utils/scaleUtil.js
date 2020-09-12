import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

const guidelineBaseHeight = 896;
const verticalScale = size => height / guidelineBaseHeight * size;

let scaleRatio = 1;
let baseScale = verticalScale;

if (PixelRatio.get() === 1.5) {
    scaleRatio = 1.2;
} else if (PixelRatio.get() === 2) {
    if(height <= 568) {
        scaleRatio = 1; // 5s, se
    } else if(height <= 667) {
        scaleRatio = 0.9; // ip6, 7, 8
    }
} else if(PixelRatio.get() === 3) {
    if(height < 812 && height >= 736) { // ip6+, ip7+, ip8+
        scaleRatio = 0.75;
    } else if(height <= 640) {
        scaleRatio = 1.1; // android
    }
}

const moderateScale = (size, factor = scaleRatio) => {
    return size + ( baseScale(size) - size ) * factor;
}

export const scale = moderateScale;

export function handleScale(number) {
    return scale(number);
}