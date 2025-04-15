package tn.esprit.rh.achat.services;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.rh.achat.entities.CategorieProduit;
import tn.esprit.rh.achat.repositories.CategorieProduitRepository;

import java.util.Arrays;
import java.util.List;

public class CategorieProduitServiceImplTest {

    @InjectMocks
    private CategorieProduitServiceImpl categorieProduitService;

    @Mock
    private CategorieProduitRepository categorieProduitRepository;

    private CategorieProduit categorieProduit;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        categorieProduit = new CategorieProduit(1L, "Code1", "Libelle1", null);
    }

    @Test
    public void testRetrieveAllCategorieProduits() {
        when(categorieProduitRepository.findAll()).thenReturn(Arrays.asList(categorieProduit));

        List<CategorieProduit> result = categorieProduitService.retrieveAllCategorieProduits();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(categorieProduitRepository, times(1)).findAll();
    }

    @Test
    public void testAddCategorieProduit() {
        when(categorieProduitRepository.save(categorieProduit)).thenReturn(categorieProduit);

        CategorieProduit result = categorieProduitService.addCategorieProduit(categorieProduit);

        assertNotNull(result);
        assertEquals(categorieProduit.getLibelleCategorie(), result.getLibelleCategorie());
        verify(categorieProduitRepository, times(1)).save(categorieProduit);
    }

    @Test
    public void testRetrieveCategorieProduit() {
        when(categorieProduitRepository.findById(1L)).thenReturn(java.util.Optional.of(categorieProduit));

        CategorieProduit result = categorieProduitService.retrieveCategorieProduit(1L);

        assertNotNull(result);
        assertEquals(categorieProduit.getIdCategorieProduit(), result.getIdCategorieProduit());
        verify(categorieProduitRepository, times(1)).findById(1L);
    }

    @Test
    public void testDeleteCategorieProduit() {
        doNothing().when(categorieProduitRepository).deleteById(1L);

        categorieProduitService.deleteCategorieProduit(1L);

        verify(categorieProduitRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testUpdateCategorieProduit() {
        when(categorieProduitRepository.save(categorieProduit)).thenReturn(categorieProduit);

        CategorieProduit result = categorieProduitService.updateCategorieProduit(categorieProduit);

        assertNotNull(result);
        assertEquals(categorieProduit.getLibelleCategorie(), result.getLibelleCategorie());
        verify(categorieProduitRepository, times(1)).save(categorieProduit);
    }
}
