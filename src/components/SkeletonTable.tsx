import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
export const SkeletonTable = () => {
  return (
    <div className='ticker-list'>
        {Array.from({ length: 15 }).map((_, index) => (
            <Stack key={index} direction="row"  spacing={1} 
            sx={{display:'flex', gap:'10px', padding:'20px' }}>
                <div>
                <Skeleton variant="circular" sx={{ bgcolor:'#6a6868', opacity:'.6', border:'solid 4px #3d9970'}} width={40} height={40} />
                </div>
                <div>
                <Skeleton variant="rounded" sx={{ bgcolor:'#6a6868', marginTop:'10px'}} width={210} height={20} />
                <Skeleton variant="rounded" sx={{ bgcolor:'#6a6868', marginTop:'10px'}} width={210} height={20} />
                <Skeleton variant="rounded" sx={{ bgcolor:'#6a6868', marginTop:'10px'}} width={210} height={20}  />
                </div>
            </Stack>
        ))}
    </div>
  )
}
