const icons =
{
    telegram: "TelegramIcon",   
    instagram: "InstagramIcon",    
    facebook: "FacebookIcon",    
    youtube: "YoutubeIcon",
  }

export const socialsConstructor = (socials: any) => {
    delete socials.id;
    return Object.keys(socials).map((key) => {
        return {
            name: icons[key as keyof typeof icons],
            link: socials[key],
        }
    })
};