'use client';

import { useState } from 'react';
import Link from 'next/link';

// Temporary welcome popup for recruiters. To remove later: delete this file
// and its usage in app/page.tsx.
export default function WelcomeModal() {
    const [open, setOpen] = useState(true);

    if (!open) return null;

    return (
        <div className="modal active">
            <div className="modal-content welcome-modal-content">
                <button className="modal-close" onClick={() => setOpen(false)}>×</button>
                <div className="modal-body">
                    <p className="welcome-text">
                        Hello Stéréolux ! <br></br>Bienvenue sur mon portfolio, je vous invite à consulter ces deux projets en particulier :{' '}
                        <Link href="/projects/la-pampa">La Pampa</Link> &amp; <Link href="/projects/tamisee">Tamisée</Link> (signalés par une étoile ★ )
                        <br></br>Ce sont mes projets les plus récents et accomplis, mais tout vaut le coup d'oeil !
                    </p>
                    <p className="welcome-text">Je vous souhaite une super visite, <br></br>Agathe</p>
                </div>
            </div>
        </div>
    );
}
