// Citation data for each publication
const citations = {
    arrest: {
        bibtex: `@article{dasgupta2026arrest,
  title={ARREST: Adversarial Resilient Regulation Enhancing Safety and Truth in Large Language Models},
  author={Dasgupta, Sharanya and Basu, Arkaprabha and Nath, Sujoy and Das, Swagatam},
  journal={arXiv preprint arXiv:2601.04394},
  year={2026}
}
}`,
    },
    complexity: {
        bibtex: `@inproceedings{nath2025complexity,
  title={From Complexity to Clarity: Transforming Chest X-ray Reports with Chained Prompting (Student Abstract)},
  author={Nath, Sujoy and Basu, Arkaprabha and Bose, Kushal and Das, Swagatam},
  booktitle={Proceedings of the AAAI Conference on Artificial Intelligence},
  volume={39},
  number={28},
  pages={29442--29444},
  year={2025}
}
}`
    },
    hallushift: {
        bibtex: `@INPROCEEDINGS{11228484,
  author={Dasgupta, Sharanya and Nath, Sujoy and Basu, Arkaprabha and Shamsolmoali, Pourya and Das, Swagatam},
  booktitle={2025 International Joint Conference on Neural Networks (IJCNN)}, 
  title={HalluShift: Measuring Distribution Shifts towards Hallucination Detection in LLMs}, 
  year={2025},
  volume={},
  number={},
  pages={1-8},
  keywords={Uncertainty;Accuracy;Large language models;Neural networks;Coherence;Benchmark testing;Cognition;Fake news;hallucination detection;distribution shift;large language models;token probability},
  doi={10.1109/IJCNN64981.2025.11228484}}
}`,
    },
    hallushiftpp: {
        bibtex: `@article{nath2025hallushift++,
  title={HalluShift++: Bridging Language and Vision through Internal Representation Shifts for Hierarchical Hallucinations in MLLMs},
  author={Nath, Sujoy and Basu, Arkaprabha and Dasgupta, Sharanya and Das, Swagatam},
  journal={arXiv preprint arXiv:2512.07687},
  year={2025}
}
}`
    },
    disentangle: {
        bibtex: `@misc{ghosh2026disentanglingcausalimportanceemergent,
      title={Disentangling Causal Importance from Emergent Structure in Multi-Expert Orchestration}, 
      author={Sudipto Ghosh and Sujoy Nath and Sunny Manchanda and Tanmoy Chakraborty},
      year={2026},
      eprint={2602.04291},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2602.04291}, 
}
}`,
    }
};

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('citationModal');
    const closeBtn = document.querySelector('.modal-close');
    const copyBtn = document.querySelector('.copy-citation-btn');
    const copyFeedback = document.querySelector('.copy-feedback');
    const citationText = document.getElementById('citationText');
    const citeBtns = document.querySelectorAll('.cite-btn');
    const tabs = document.querySelectorAll('.citation-tab');

    let currentCitation = null;
    let currentFormat = 'bibtex';

    // Open modal when cite button is clicked
    citeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const citationId = this.getAttribute('data-citation-id');
            currentCitation = citations[citationId];
            currentFormat = 'bibtex';
            
            // Reset to BibTeX tab
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-format') === 'bibtex') {
                    tab.classList.add('active');
                }
            });
            
            updateCitationDisplay();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFormat = this.getAttribute('data-format');
            updateCitationDisplay();
        });
    });

    // Update citation display
    function updateCitationDisplay() {
        if (currentCitation) {
            citationText.textContent = currentCitation[currentFormat];
        }
    }

    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        const textToCopy = citationText.textContent;
        
        // Modern clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(function() {
                showCopyFeedback();
            }).catch(function(err) {
                // Fallback for older browsers
                fallbackCopyToClipboard(textToCopy);
            });
        } else {
            // Fallback for older browsers
            fallbackCopyToClipboard(textToCopy);
        }
    });

    // Fallback copy function for older browsers
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback();
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }

    // Show copy feedback
    function showCopyFeedback() {
        copyFeedback.classList.add('show');
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    }
});