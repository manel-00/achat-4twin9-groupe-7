package tn.esprit.rh.achat.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.rh.achat.entities.Produit;

public class ProduitServiceTest {

    @Mock
    private ProduitServiceImpl produitService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetProduit() {
        // Arrange
        Produit produit = new Produit();
        produit.setIdProduit(1L); // Corrected method name
        produit.setLibelleProduit("ProduitX"); // Corrected method name
        when(produitService.retrieveProduit(1L)).thenReturn(produit);

        // Act
        String nomProduit = produitService.retrieveProduit(1L).getLibelleProduit(); // Corrected method name

        // Assert
        assertEquals("ProduitX", nomProduit);
    }
}