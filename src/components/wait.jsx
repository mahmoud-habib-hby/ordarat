import { Download, DownloadForOffline } from "@mui/icons-material";

export function Wait({ e }) {
    if (e == true) {
        return (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center flex-column justify-content-center bg-primary z-2">
               <DownloadForOffline className="text-white fs-1"/>
               <br />
               <p className="text-white fs-3">Loading...</p>
            </div>
        );
    }
    return null;
}