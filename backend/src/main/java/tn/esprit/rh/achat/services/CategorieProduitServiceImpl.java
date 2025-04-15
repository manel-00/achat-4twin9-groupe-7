package tn.esprit.rh.achat.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.rh.achat.entities.CategorieProduit;
import tn.esprit.rh.achat.repositories.CategorieProduitRepository;

import java.util.List;

@Service
public class CategorieProduitServiceImpl implements ICategorieProduitService {

    private static final Logger logger = LoggerFactory.getLogger(CategorieProduitServiceImpl.class);

    @Autowired
    CategorieProduitRepository categorieProduitRepository;

    @Override
    public List<CategorieProduit> retrieveAllCategorieProduits() {
        logger.info("Retrieving all category products");
        return categorieProduitRepository.findAll();
    }

    @Override
    public CategorieProduit addCategorieProduit(CategorieProduit cp) {
        logger.info("Adding new category product: {}", cp.getLibelleCategorie());
        return categorieProduitRepository.save(cp);
    }

    @Override
    public void deleteCategorieProduit(Long id) {
        logger.info("Deleting category product with ID: {}", id);
        categorieProduitRepository.deleteById(id);
    }

    @Override
    public CategorieProduit updateCategorieProduit(CategorieProduit cp) {
        logger.info("Updating category product: {}", cp.getLibelleCategorie());
        return categorieProduitRepository.save(cp);
    }

    @Override
    public CategorieProduit retrieveCategorieProduit(Long id) {
        logger.info("Retrieving category product with ID: {}", id);
        return categorieProduitRepository.findById(id).orElse(null);
    }
}
