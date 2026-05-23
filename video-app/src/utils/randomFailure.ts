export const getRandomFailure = (): string | null => {
    const random = Math.random();

    if (random < 0.15) {
        return "AI video generation failed";
    }

    if (random < 0.25) {
        return "Video generation timeout";
    }

    return null;
};