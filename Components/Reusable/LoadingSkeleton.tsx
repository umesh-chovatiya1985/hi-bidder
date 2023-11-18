import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function LoadingSckeleton({  baseColor, highlightColor, count, width, height }: any) {
    return (
        <>
            <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                <Skeleton count={count} width={width} height={height} />
            </SkeletonTheme>
        </>
    )
}