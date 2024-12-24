import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Container, IconButton, Typography } from '@mui/material';
import { ISbRichtext } from '@storyblok/react';
import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { render } from 'storyblok-rich-text-react-renderer';
import { PROGRESS_STATUS } from '../../constants/enums';
import { columnStyle, rowStyle } from '../../styles/common';
import { TextNode } from '../../utils/helper-types/translations';
import { RichTextOptions } from '../../utils/richText';
import UserResearchBanner from '../banner/UserResearchBanner';
import ProgressStatus from '../common/ProgressStatus';

export interface HeaderProps {
  title: string;
  introduction?: TextNode | ISbRichtext;
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  translatedImageAlt?: string;
  progressStatus?: PROGRESS_STATUS;
  children?: any;
  cta?: any;
}

const headerContainerStyle = {
  ...rowStyle,
  alignItems: 'flex-start',
  minHeight: { xs: 220, lg: 360 },
  paddingBottom: { xs: '2.5rem !important', md: '5rem !important' },
  paddingTop: { xs: '0', md: '6.5rem ' },
  gap: 4,
  background: {
    xs: 'linear-gradient(180deg, #F3D6D8 53.12%, #FFEAE1 100%)',
    md: 'linear-gradient(180deg, #F3D6D8 36.79%, #FFEAE1 73.59%)',
  },
};

const imageContainerStyle = {
  position: 'relative',
  width: { xs: 200, sm: 150, md: 250 },
  height: { xs: 200, sm: 150, md: 250 },
  marginLeft: { xs: 'auto', md: 0 },
  marginRight: { xs: '1rem', md: '8%' },
  marginTop: 0,
} as const;

const textContainerStyle = {
  ...columnStyle,
  justifyContent: 'space-between',
  width: { xs: '100%', sm: 'auto' },
  maxWidth: { xs: '100%', sm: '80%', md: '55%' },
} as const;

const childrenContentStyle = {
  marginBottom: 4,
} as const;

const textContentStyle = {
  marginTop: 'auto',
} as const;

const backButtonStyle = {
  display: { md: 'none' },
  width: '2.5rem',
  marginLeft: '-0.675rem',
  marginY: { xs: 1.5, sm: 2 },
  paddingRight: '1rem',
} as const;

const backIconStyle = {
  height: '1.75rem',
  width: '1.75rem',
  color: 'primary.dark',
} as const;

const Header = (props: HeaderProps) => {
  const {
    title,
    introduction,
    imageAlt,
    translatedImageAlt,
    imageSrc,
    progressStatus,
    children,
    cta,
  } = props;

  const router = useRouter();
  const tS = useTranslations('Shared');
  const imageAltText = translatedImageAlt ? translatedImageAlt : imageAlt ? tS(imageAlt) : '';

  const getIntroduction = () => {
    if (!introduction) return undefined;
    if (typeof introduction === 'string') {
      return <Typography fontSize="1rem !important">{introduction}</Typography>;
    } else if (typeof introduction === 'object' && 'content' in introduction) {
      return render(introduction as ISbRichtext, RichTextOptions);
    } else {
      return introduction;
    }
  };

  return (
    <Container sx={headerContainerStyle}>
      <UserResearchBanner />
      <Box sx={textContainerStyle}>
        <IconButton
          sx={backButtonStyle}
          onClick={() => router.back()}
          aria-label={tS('navigateBack')}
        >
          <KeyboardArrowLeftIcon sx={backIconStyle} />
        </IconButton>
        {children && <Box sx={childrenContentStyle}>{children}</Box>}
        <Box sx={textContentStyle}>
          <Typography variant="h1" component="h1" marginBottom={{ md: '2.5rem' }}>
            {title}
          </Typography>
          {getIntroduction()}
        </Box>
        {progressStatus && <ProgressStatus status={progressStatus} />}
        {cta && <Box mt={4}>{cta}</Box>}
      </Box>
      <Box sx={imageContainerStyle}>
        <Image
          alt={imageAltText}
          src={imageSrc}
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
    </Container>
  );
};

export default Header;
